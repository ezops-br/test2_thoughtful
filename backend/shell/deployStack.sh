# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

echo 'Validate Templates...'

aws cloudformation validate-template --template-body file://../Devops/ARN.yml \
    --profile ezops \
    --no-cli-pager

aws cloudformation validate-template --template-body file://../Devops/S3.yml \
    --profile ezops \
    --no-cli-pager

aws cloudformation validate-template --template-body file://../Devops/DynamoDB.yml \
    --profile ezops \
    --no-cli-pager

aws cloudformation validate-template --template-body file://../Devops/Lambda.yml \
    --profile ezops \
    --no-cli-pager

echo 'Templates Valid!'

echo 'Deploy ARN...'
aws cloudformation deploy --template-file '../Devops/ARN.yml' \
    --stack-name 'test-thoughtful-arn' \
    --profile ezops \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "TypeProject=test-thoughtful"

echo 'Deploy ARN Complete'

echo 'Deploy S3...'
aws cloudformation deploy --template-file '../Devops/S3.yml' \
    --stack-name 'test-thoughtful-s3' \
    --profile ezops \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "TypeProject=test-thoughtful"

echo 'Deploy S3 Complete'

echo 'Deploy DynamoDB...'
aws cloudformation deploy --template-file '../Devops/DynamoDB.yml' \
    --stack-name 'test-thoughtful-dynamodb' \
    --profile ezops \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "TypeProject=test-thoughtful"

echo 'Deploy DynamoDB Complete'

echo 'Deploy Lambda...'
aws cloudformation deploy --template-file '../Devops/Lambda.yml' \
    --stack-name 'test-thoughtful-lambda' \
    --profile ezops \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "AcmCertificate=arn:aws:acm:us-east-1:975635808270:certificate/dff8ed1e-8f8e-4a08-af26-d194758eac18" \
    "DomainName=dev.ezops.com.br" \
    "NameAPI=thoughtful-test" \
    "TypeProject=test-thoughtful" \
    "ServiceNameCreateOTP=test-thoughtful-create" \
    "ServiceNameVerifyOTP=test-thoughtful-verify" \
    "Timestamp=1"
