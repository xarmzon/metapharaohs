import { DefaultSeoProps } from 'next-seo'

export const APP_NAME = 'Meta Pharaohs NFT'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'


export const DEFAULT_SEO: DefaultSeoProps = {
  title: 'Mint',
  defaultTitle: '',
  titleTemplate: `${APP_NAME} | %s `,
  description:
    'Meta Pharaohs is a unique collection of Artworks. Aiming to be the most revolutionary web3, Meta Pharaohs are here to dominate the NFT Space.',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: APP_NAME,
    description: `${APP_NAME.toUpperCase()} READY TO TAKE OVER THE METAVERSE AND THE NFT SPACE`,
    images: [
      {
        url: `${SITE_URL}images/nft/fm_4.png`,
        width: 600,
        height: 600,
        alt: `${APP_NAME} open graph image`,
      },
    ],
  },
}
