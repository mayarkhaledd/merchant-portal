export function obscureEmail(email: string): string {
  const [username, domain] = email.split("@");
  const obscuredUsername = obscurePart(username, 1, 2);
  const [domainName, domainExtension] = splitDomain(domain);
  const obscuredDomainName = obscurePart(domainName, 2, 0); // Keep the first 2 characters and obscure the rest
  return `${obscuredUsername}@${obscuredDomainName}${domainExtension}`;
}

function obscurePart(
  part: string,
  visibleStart: number,
  visibleEnd: number,
): string {
  if (part.length <= visibleStart + visibleEnd) {
    return part; // Not enough characters to obscure meaningfully
  }
  return (
    part.slice(0, visibleStart) +
    "*".repeat(part.length - visibleStart - visibleEnd) +
    part.slice(part.length - visibleEnd)
  );
}

function splitDomain(domain: string): [string, string] {
  const lastDotIndex = domain.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return [domain, ""]; // In case there's no dot in the domain
  }
  return [domain.slice(0, lastDotIndex), domain.slice(lastDotIndex)];
}
