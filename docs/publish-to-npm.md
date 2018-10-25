# Notes on publish process

```
# clone project to local
cd /gatsby-project
mkdir plugins
cd plugins
git clone https://github.com/thebarty/gatsby-plugin-analytics-without-segment.git
cd gatsby-plugin-analytics-without-segment

# ... edit changes

# push to github
git add .
git commit -m "message"
git push -all

# publish to npm
npm run publish-to-npm;  # build and publish to npm
```
