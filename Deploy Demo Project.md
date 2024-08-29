ng add angular-cli-ghpages

// Build the Project
ng build ng-mdx-remote-demo --base-href "https://thisiseddy-ab.github.io/ng-mdx-remote/"

//Deploy
npx angular-cli-ghpages --dir=dist/ng-mdx-remote-demo/browser --no-silent