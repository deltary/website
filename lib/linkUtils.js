import Link from 'next/link'

const assetPrefix = process.env.ASSET_PREFIX;

function DynamicLink({ children, as, ...props }) {
  return (
    <Link href="/[...page]" as={asLink(as)} {...props}>
      {children}
    </Link>
  );
}

function LogoLink({ logo, ...props }) {
  return (
    <Link href="/" {...props}>
      <a>
        <img src={asLink(logo)} />
      </a>
    </Link>
  );
}

const asLink = link => `${assetPrefix}${link}`;

export { DynamicLink, LogoLink };