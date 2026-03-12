import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

type HeaderMap = Record<string, string | string[] | undefined>;

interface ScanReport {
  ssl: string;
  xFrameOptions: string;
  contentSecurityPolicy: string;
  xssProtection: string;
  poweredBy: string;
  strictTransport: string;
  referrerPolicy: string;
  permissionsPolicy: string;
  cacheControl: string;
  serverHeader: string;
  wpVersion: string;
  directoryListing: string;
  xmlrpc: string;
}

function header(headers: HeaderMap, key: string): string | null {
  const value = headers[key.toLowerCase()];
  if (!value) return null;
  return Array.isArray(value) ? value.join(", ") : value;
}

function normalizeUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get("url")?.trim();

  if (!urlParam) {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }

  const url = normalizeUrl(urlParam);

  try {
    const baseUrl = new URL(url);

    let mainResponse: AxiosResponse<string>;

    try {
      mainResponse = await axios.get<string>(url, {
        timeout: 15000,
        maxRedirects: 5,
        validateStatus: () => true,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; WPShield-SecurityScanner/2.0)",
        },
      });
    } catch {
      return NextResponse.json({
        error: "Website scan timeout. Target site may be slow or blocked",
      });
    }

    const headers = mainResponse.headers as HeaderMap;
    const body: string = mainResponse.data ?? "";

    const xmlrpcUrl = `${baseUrl.origin}/xmlrpc.php`;
    const wpContentUrl = `${baseUrl.origin}/wp-content/`;
    const readmeUrl = `${baseUrl.origin}/readme.html`;

    const [xmlrpcRes, wpContentRes, readmeRes] = await Promise.all([
      axios
        .get<string>(xmlrpcUrl, { timeout: 5000, validateStatus: () => true })
        .catch(() => null),
      axios
        .get<string>(wpContentUrl, { timeout: 5000, validateStatus: () => true })
        .catch(() => null),
      axios
        .get<string>(readmeUrl, { timeout: 5000, validateStatus: () => true })
        .catch(() => null),
    ]);

    const ssl = url.startsWith("https") ? "PASS" : "FAIL";

    const xFrameOptions = header(headers, "x-frame-options")
      ? "PASS"
      : "MISSING";

    const contentSecurityPolicy = header(headers, "content-security-policy")
      ? "PASS"
      : "MISSING";

    const xssProtection = header(headers, "x-xss-protection")
      ? "PASS"
      : "MISSING";

    const poweredByVal = header(headers, "x-powered-by");
    const poweredBy = poweredByVal
      ? `VISIBLE (${poweredByVal})`
      : "HIDDEN";

    const hstsVal = header(headers, "strict-transport-security");
    let strictTransport = "MISSING";

    if (hstsVal) {
      const match = hstsVal.match(/max-age=(\d+)/);
      const maxAge = match ? parseInt(match[1], 10) : 0;

      if (maxAge >= 31536000) strictTransport = "PASS";
      else if (maxAge > 0) strictTransport = "PASS (weak max-age)";
    }

    const referrerPolicy = header(headers, "referrer-policy")
      ? "PASS"
      : "MISSING";

    const permissionsPolicy =
      header(headers, "permissions-policy") ||
      header(headers, "feature-policy")
        ? "PASS"
        : "MISSING";

    const cacheControlVal = header(headers, "cache-control");
    let cacheControl = "MISSING";

    if (cacheControlVal) {
      const hasNoStore = cacheControlVal.includes("no-store");
      const hasNoCache = cacheControlVal.includes("no-cache");
      cacheControl =
        hasNoStore || hasNoCache
          ? "PASS"
          : "PASS (review directives)";
    }

    const serverVal = header(headers, "server");
    let serverHeader = "HIDDEN";

    if (serverVal) {
      const detailed = /Apache\/[\d.]+|nginx\/[\d.]+|Microsoft-IIS\/[\d.]+/i.test(
        serverVal
      );

      serverHeader = detailed
        ? "VISIBLE (version exposed)"
        : "PASS (generic)";
    }

    let wpVersion = "NONE";

    const wpGeneratorMatch = body.match(
      /<meta[^>]+generator[^>]+WordPress\s*([\d.]+)/i
    );

    const readmeBody = readmeRes?.data ?? "";
    const readmeVersionMatch = readmeBody.match(/Version\s*([\d.]+)/i);

    if (wpGeneratorMatch) {
      wpVersion = `DETECTED (v${wpGeneratorMatch[1]})`;
    } else if (readmeRes?.status === 200 && readmeVersionMatch) {
      wpVersion = `DETECTED via readme (v${readmeVersionMatch[1]})`;
    } else if (body.includes("/wp-content/") || body.includes("wp-includes")) {
      wpVersion = "HIDDEN";
    }

    let directoryListing = "RESTRICTED";

    if (
      wpContentRes?.status === 200 &&
      (wpContentRes.data ?? "").includes("Index of")
    ) {
      directoryListing = "OPEN";
    }

    let xmlrpc = "DISABLED";

    if (xmlrpcRes) {
      const xmlrpcBody = xmlrpcRes.data ?? "";

      if (
        xmlrpcRes.status === 200 &&
        xmlrpcBody.includes("XML-RPC server accepts POST requests only")
      ) {
        xmlrpc = "ENABLED";
      }
    }

    const report: ScanReport = {
      ssl,
      xFrameOptions,
      contentSecurityPolicy,
      xssProtection,
      poweredBy,
      strictTransport,
      referrerPolicy,
      permissionsPolicy,
      cacheControl,
      serverHeader,
      wpVersion,
      directoryListing,
      xmlrpc,
    };

    return NextResponse.json(report);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json({
      error: "Unexpected scan error: " + message,
    });
  }
}