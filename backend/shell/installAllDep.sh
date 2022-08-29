# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Install Modules (Typescript)
cd ../lambda/CreateOTP && yarn && cd $ROOT_FOLDER
cd ../lambda/VerifyOTP && yarn && cd $ROOT_FOLDER
cd ../lambda/Layer && yarn && cd $ROOT_FOLDER
