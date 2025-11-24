$headers = @{'Content-Type' = 'application/json'}
$body = '{"email":"test@example.com","password":"password123"}'

try {
  $response = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method POST -Headers $headers -Body $body
  Write-Host "✅ Login Success:"
  $response | ConvertTo-Json
} catch {
  Write-Host "❌ Login Failed:"
  Write-Host $_.Exception.Message
}
