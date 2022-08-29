# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Install depedencies
sh ./installAllDep.sh

# Compile
sh ./compile.sh

# Zip Lambda
cd ../lambda/CreateOTP && cd ./dist/CreateOTP && zip -q -r ../../lambda.zip ./ && echo "Success CreateOTP" && cd $ROOT_FOLDER
cd ../lambda/VerifyOTP && cd ./dist/VerifyOTP && zip -q -r ../../lambda.zip ./ && echo "Success VerifyOTP" && cd $ROOT_FOLDER

# Remove node_modules and install dependencies (prod)
cd ../lambda/CreateOTP && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd ../lambda/VerifyOTP && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd ../lambda/Layer && rm -r node_modules && yarn --production && cd $ROOT_FOLDER

# Create folder nodejs and copy node_modules
cd ../lambda/CreateOTP && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER
cd ../lambda/VerifyOTP && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER

# Zip nodejs
cd ../lambda/CreateOTP && zip -q -r ./lib.zip ./nodejs && echo "Success CreateOTP" && cd $ROOT_FOLDER
cd ../lambda/VerifyOTP && zip -q -r ./lib.zip ./nodejs && echo "Success VerifyOTP" && cd $ROOT_FOLDER

# Move folder to nodejs Layer Helper
cd ../lambda/Layer && mkdir nodejs && mv ./dist/* ./nodejs && mv ./node_modules ./nodejs || true && cd $ROOT_FOLDER

# Zip Layer Helper
cd ../lambda/Layer && zip -q -r ./lib.zip ./nodejs && echo "Success Layer" && cd $ROOT_FOLDER

# Sync S3 Lambda
echo 'Sync S3'
export S3_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name test-thoughtful-s3 --query "Stacks[].Outputs[?OutputKey=='S3BucketLambda'].OutputValue" --profile ezops --no-cli-pager --output text)
aws s3 cp ../lambda/CreateOTP/lambda.zip s3://${S3_NAME}/CreateOTP/lambda.zip --profile ezops
aws s3 cp ../lambda/VerifyOTP/lambda.zip s3://${S3_NAME}/VerifyOTP/lambda.zip --profile ezops

# Sync S3 Lib
aws s3 cp ../lambda/CreateOTP/lib.zip s3://${S3_NAME}/CreateOTP/lib.zip --profile ezops
aws s3 cp ../lambda/VerifyOTP/lib.zip s3://${S3_NAME}/VerifyOTP/lib.zip --profile ezops

# Sync S3 Layer Helper
aws s3 cp ../lambda/Layer/lib.zip s3://${S3_NAME}/Layer/lib.zip --profile ezops

# Get Name Lambda
export LAMBDA_FUNCTION_CREATE_OTP=$(aws --region us-east-1 cloudformation describe-stacks --stack-name test-thoughtful-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameCreateOTP'].OutputValue" --profile ezops --no-cli-pager --output text)
export LAMBDA_FUNCTION_VERIFY_OTP=$(aws --region us-east-1 cloudformation describe-stacks --stack-name test-thoughtful-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameVerifyOTP'].OutputValue" --profile ezops --no-cli-pager --output text)

#Update Code Lambda
echo 'Update Code'
aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_CREATE_OTP} --s3-bucket ${S3_NAME} --s3-key CreateOTP/lambda.zip --profile ezops --no-cli-pager || true
aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_VERIFY_OTP} --s3-bucket ${S3_NAME} --s3-key VerifyOTP/lambda.zip --profile ezops --no-cli-pager || true

# Update Lib
echo 'Create Layer'
export LAYER_CREATE_OTP=$(aws lambda publish-layer-version --layer-name thoughtful-layer-create --content S3Bucket=${S3_NAME},S3Key=CreateOTP/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile ezops --no-cli-pager --output text || true)
export LAYER_VERIFY_OTP=$(aws lambda publish-layer-version --layer-name thoughtful-layer-read --content S3Bucket=${S3_NAME},S3Key=VerifyOTP/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile ezops --no-cli-pager --output text || true)
export LAYER_HELPER=$(aws lambda publish-layer-version --layer-name thoughtful-layer-helper --content S3Bucket=${S3_NAME},S3Key=Layer/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile ezops --no-cli-pager --output text || true)

# Update Layers
echo 'Update Layer'
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_CREATE_OTP} --layers ${LAYER_CREATE_OTP} ${LAYER_HELPER} --profile ezops --no-cli-pager || true
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_VERIFY_OTP} --layers ${LAYER_VERIFY_OTP} ${LAYER_HELPER} --profile ezops --no-cli-pager || true

# Clear
echo 'Clear'
sh ./clearAllDep.sh
