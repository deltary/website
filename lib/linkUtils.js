import Link from 'next/link'

const assetPrefix = process.env.ASSET_PREFIX;

function DynamicLink({ children, as, ...props }) {
  return (
    <Link href="/[...page]" as={asLink(as)} {...props}>
      {children}
    </Link>
  );
}

const asLink = link => `${assetPrefix}${link}`;

export { DynamicLink, asLink };
