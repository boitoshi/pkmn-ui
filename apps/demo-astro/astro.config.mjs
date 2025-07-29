import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/pkmn-ui',
  server: {
    port: 4321,
    host: true
  }
});