# Prompt for version number
$versionNumber = Read-Host -Prompt "Enter the version number"

# Create .build folder and copy files
New-Item -ItemType Directory -Force -Path ".build" | Out-Null
Get-ChildItem -Path "." -Exclude ".*", "*.ps1" | Copy-Item -Destination ".build" -Recurse -Force

# Update version in manifest.json
$manifestPath = ".build\manifest.json"
$manifest = Get-Content -Path $manifestPath | ConvertFrom-Json
$manifest.version = $versionNumber
$manifest | ConvertTo-Json -Depth 100 | Set-Content -Path $manifestPath

# Zip Chrome extension and save it to .release folder
New-Item -ItemType Directory -Force -Path ".release" | Out-Null
$chromeZipPath = ".release\eight-dollars-v${versionNumber}-chrome.zip"
Compress-Archive -Path ".build\*" -DestinationPath $chromeZipPath

# Update version in manifest.v2.json
$manifestV2Path = ".build\manifest.v2.json"
$manifestV2 = Get-Content -Path $manifestV2Path | ConvertFrom-Json
$manifestV2.version = $versionNumber
$manifestV2 | ConvertTo-Json -Depth 100 | Set-Content -Path $manifestV2Path

# Replace contents of manifest.json with manifest.v2.json
Copy-Item -Path $manifestV2Path -Destination $manifestPath -Force

# Zip Firefox extension and save it to .release folder
$firefoxZipPath = ".release\eight-dollars-v${versionNumber}-firefox.zip"
Compress-Archive -Path ".build\*" -DestinationPath $firefoxZipPath

Write-Host "Release packages created successfully for Chrome and Firefox extensions"