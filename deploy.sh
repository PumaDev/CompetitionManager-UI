#/bin/bash

# Build application for prod env
ng build --prod --aot

# Upload files
aws s3 cp ./dist/CompetitionManager-UI/ s3://mke-competition-manager --recursive --acl public-read
