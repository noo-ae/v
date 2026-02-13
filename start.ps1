$port = 8080
Write-Host "Starting Web Server at http://localhost:$port ..."

# Use npx.cmd explicitly for Windows compatibility
$npxPath = (Get-Command npx.cmd).Source

# Start http-server in a new hidden window
# -c-1 disables caching so you see changes immediately
$process = Start-Process -FilePath $npxPath -ArgumentList "http-server -p $port -c-1 --cors" -PassThru -WindowStyle Hidden

# Save the Process ID to a file so we can stop it later
if ($process) {
    $process.Id | Out-File ".server_pid"
    Write-Host "Server started with PID: $($process.Id)"
    
    # Wait a moment for server to start
    Start-Sleep -Seconds 3

    # Open the website in default browser
    Start-Process "http://localhost:$port"
    Write-Host "Please check your browser."
}
else {
    Write-Host "Failed to start server process."
}

Write-Host "To stop the server, run: .\stop.ps1"
