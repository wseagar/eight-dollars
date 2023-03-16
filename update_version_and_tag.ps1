# Prompt for version number
$versionNumber = Read-Host -Prompt "Enter the version number"

# Update version in manifest.json
$manifestPath = "manifest.json"
$manifest = Get-Content -Path $manifestPath | ConvertFrom-Json
$manifest.version = $versionNumber
$manifest | ConvertTo-Json -Depth 100 | Set-Content -Path $manifestPath

# Check if Git is installed
try {
    git --version | Out-Null
} catch {
    Write-Host "Git is not installed or not in the PATH. Please install Git and try again."
    exit 1
}

# Check if the working directory is a Git repository
try {
    git rev-parse --is-inside-work-tree | Out-Null
} catch {
    Write-Host "The current directory is not a Git repository. Please initialize a Git repository and try again."
    exit 1
}

# Add all files to the Git staging area
git add -A

# Create a commit with the release number as the message
$commitMessage = "Release v$versionNumber"
git commit -m $commitMessage

# Create a tag with the release number
$tagName = "v$versionNumber"
git tag $tagName

Write-Host "Git commit and tag created successfully for the current release number."