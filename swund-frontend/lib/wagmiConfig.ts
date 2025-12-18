import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { polygonAmoy, polygon } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '';

if (!projectId) {
  throw new Error('NEXT_PUBLIC_WC_PROJECT_ID is not set in .env.local');
}

export const config = getDefaultConfig({
  appName: 'Swund',
  projectId,
  chains: [polygonAmoy, polygon], // Include mainnet now for easier future switching
  transports: {
    [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology'), // Public OK for dev/test
    [polygon.id]: http('https://polygon-rpc.com'), // Reliable public for mainnet; swap to Alchemy/QuickNode later
  },
  ssr: true,
  // Optional: Better rate limiting handling
  batch: { multicall: true },
});