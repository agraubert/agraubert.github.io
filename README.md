# agraubert.github.io

This is my self-contained, and self-serving website repo.<br>
The setup is highly unusual, but I chose it so that I could develop code and deploy it all from one repository

The only nuisance with developing is that node/npm needs to run from within the `build` directory, while git needs to be run from the project root.

Using a custom pre-commit hook, I have webpack rebuild the js and add it so that the production code is always deployed when I commit a source change.

```bash
echo "BUILDING..."
npm run build --prefix build
git add main.bundle.js```
