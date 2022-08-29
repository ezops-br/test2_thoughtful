# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Compile
cd ../ && yarn build && cd $ROOT_FOLDER
