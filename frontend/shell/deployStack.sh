# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

echo 'Validate Templates...'

aws cloudformation validate-template --template-body file://../Devops/S3.yml \
    --profile ezops \
    --no-cli-pager

echo 'Templates Valid!'

echo 'Deploy S3...'
aws cloudformation deploy --template-file '../Devops/S3.yml' \
    --stack-name 'test-thoughtful-s3-site' \
    --profile ezops \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "TypeProject=test-thoughtful"

echo 'Deploy S3 Complete'
