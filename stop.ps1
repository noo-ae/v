if (Test-Path ".server_pid") {
    $pidFromFile = Get-Content ".server_pid"
    
    try {
        Stop-Process -Id $pidFromFile -Force -ErrorAction Stop
        Write-Host "Web Server (PID: $pidFromFile) has been stopped."
    }
    catch {
        Write-Host "Could not find a running process with PID $pidFromFile. It might have been closed already."
    }
    
    Remove-Item ".server_pid" -ErrorAction SilentlyContinue
} else {
    Write-Host "No active server PID file found. Is the server running?"
}
