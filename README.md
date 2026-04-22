# ŌVRA Shopify Theme

Premium dark luxury streetwear Shopify OS 2.0 theme for ŌVRA.

## Local development

1. Install Shopify CLI if it is not already available.
2. Authenticate with your store:
   `shopify auth login`
3. Move into the theme directory:
   `cd ovra-theme`
4. Start a local preview session:
   `shopify theme dev`

## Useful commands

- `shopify theme dev` starts the local development server.
- `shopify theme push` uploads the theme to the connected store.
- `shopify theme pull` syncs remote changes into the local theme.
- `shopify theme check` runs theme validation locally if the CLI supports it.

## Theme structure

- `assets/` shared CSS and JavaScript
- `layout/` global HTML shell
- `sections/` homepage and page-level modules
- `snippets/` reusable components
- `templates/` OS 2.0 JSON template mapping
- `config/` theme editor settings
