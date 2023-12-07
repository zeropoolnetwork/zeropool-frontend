#!/usr/bin/env bash
# ------------------------------------------------------------------
# [Author] Anton Pegov
#          Publish the new version of the app to the Docker Hub
# ------------------------------------------------------------------

set -e

USERNAME=antonpegov
IMAGE=zeropool-frontend
VERSION="master"
SEPARATOR="_"

# Get the current Git branch
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# If the current branch is not master, then use it's name as a tag
if [ "$GIT_BRANCH" != "master" ]; then
  VERSION="$GIT_BRANCH"

  # Get the list of tags for the Docker image from Docker Hub
  TAGS=$(curl -s https://registry.hub.docker.com/v2/repositories/$USERNAME/$IMAGE/tags)

  # Extract the tags that match the version format [MY_VERSION]___[ANY_NUMBER]
  MATCHING_TAGS=$(echo $TAGS | jq -r '.results[] | select(.name | test("^'$VERSION$SEPARATOR'\\d+$")) | .name')

  # Get the last tag by splitting the tags by newline and taking the last one
  LAST_TAG=$(echo "$MATCHING_TAGS" | sort -t $SEPARATOR -k 2 -n | tail -n 1)

  if [ -z "$LAST_TAG" ]; then
      echo "No image with tag format $VERSION$SEPARATOR[ANY_NUMBER] exists"
      VERSION="$VERSION$SEPARATOR"$(echo 1)
  else
      echo "Last image with branch tag is $LAST_TAG"
      VERSION="$VERSION$SEPARATOR"$(echo "$LAST_TAG" | awk -F "$SEPARATOR" '{print $2+1}')
  fi
fi

echo "Current image version is $USERNAME/$IMAGE:$VERSION"

# yarn test:quiet
# yarn build && \
docker build -f ./docker/Dockerfile -t $USERNAME/$IMAGE:$VERSION . && \
docker tag $USERNAME/$IMAGE:$VERSION $USERNAME/$IMAGE:latest && \
docker push $USERNAME/$IMAGE:$VERSION && \
docker push $USERNAME/$IMAGE:latest

echo $VERSION
