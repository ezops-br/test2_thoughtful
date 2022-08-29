# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Compile
cd ../lambda/CreateOTP && yarn compile && cd $ROOT_FOLDER
cd ../lambda/VerifyOTP && yarn compile && cd $ROOT_FOLDER
cd ../lambda/Layer && yarn compile && cd $ROOT_FOLDER
