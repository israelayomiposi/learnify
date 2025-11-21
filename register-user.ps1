$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method POST -Body $body -ContentType 'application/json'

Write-Host "Registration Response:"
$response | ConvertTo-Json -Depth 10
