# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

echo $ROOT_FOLDER

# Install Modules (Typescript)

cd ../lambda/CreateOTP && rm -r ./node_modules ./dist *.zip* ./nodejs && echo "Clear CreateOTP"
cd $ROOT_FOLDER
cd ../lambda/VerifyOTP && rm -r ./node_modules ./dist *.zip* ./nodejs && echo "Clear VerifyOTP"
cd $ROOT_FOLDER
cd ../lambda/Layer && rm -r ./node_modules ./dist *.zip* ./nodejs && echo "Clear Layer"
cd $ROOT_FOLDER

sh ./installAllDep.sh
