$urls = @(
    @{Name="HUD Housing Counseling Training"; URL="https://www.hud.gov/program_offices/housing/sfh/hcc/hcs"},
    @{Name="Consumer.gov First-Time Renter Guide"; URL="https://www.consumer.gov/articles/0089-renting-apartment-or-house"},
    @{Name="Nolo Tenant Rights Checklist"; URL="https://www.nolo.com/legal-encyclopedia/tenant-rights-checklist.html"},
    @{Name="HUD Fair Housing Training"; URL="https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint"},
    @{Name="NHLP Eviction Prevention Guide"; URL="https://www.nhlp.org/resource-center/eviction-prevention/"},
    @{Name="Consumer.gov Security Deposit Guide"; URL="https://www.consumer.gov/articles/0070-renting-apartment-or-house"}
)

Write-Host "Testing Educational Resource URLs from Support Page..." -ForegroundColor Green
Write-Host ""

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $($url.URL) -Method Head -TimeoutSec 10
        Write-Host "OK $($url.Name): $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED $($url.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Educational resource URL testing completed." -ForegroundColor Green 