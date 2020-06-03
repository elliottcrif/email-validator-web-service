#!/bin/bash
set -e

yarn build

export WORKSPACE=${1:-dev}

# DEPENDS ON THE FOLLOWING ENVIRONMENT VARIABLES BEING SET BY CI
: "${terraform_state_bucket?Unset variable}"

pushd infrastructure/terraform
terraform init \
       -backend-config bucket="${terraform_state_bucket}"
# If the workspace does not exist, create it.
if ! terraform workspace select ${WORKSPACE}; then
    terraform workspace new ${WORKSPACE}
fi
terraform init \
       -backend-config bucket="${terraform_state_bucket}"
       
terraform plan -out=tf.plan -detailed-exitcode && rc=$? || rc=$?

# rc: 0 -> no changes present, 1 -> error, 2 -> pending changes
if [ $rc -eq 2 ]; then
     terraform apply -input=false tf.plan
elif [ $rc -eq 1 ]; then
    exit 1;
fi

rm tf.plan

popd
