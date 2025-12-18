import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { polygonAmoy, polygon } from 'wagmi/chains'; // polygonAmoy is built-in

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WC_PROJECT_ID is not set');
}

export const config = getDefaultConfig({
  appName: 'Swund',
  projectId,
  chains: [polygonAmoy], // Add polygon later for mainnet: [polygonAmoy, polygon]
  // Optional: better RPC performance (use Alchemy/Infura for production)
  transports: {
    [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology'), // Public RPC for now
  },
  ssr: true, // Important for Next.js SSR
});