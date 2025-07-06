$urls = @(
    @{Name="HUD Tenant Rights"; URL="https://www.hud.gov/topics/rental_assistance/tenantrights"},
    @{Name="California DCA"; URL="https://www.dca.ca.gov/publications/landlordbook/tenant.pdf"},
    @{Name="NY Rent Guidelines"; URL="https://rentguidelinesboard.cityofnewyork.us/"},
    @{Name="Texas Property Code"; URL="https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm"},
    @{Name="Florida Bar"; URL="https://www.floridabar.org/public/consumer/pamphlet012/"},
    @{Name="Illinois Legal Aid"; URL="https://www.illinoislegalaid.org/legal-information/tenant-rights"},
    @{Name="National Housing Law Project"; URL="https://nhlp.org"},
    @{Name="LAFLA"; URL="https://lafla.org"},
    @{Name="LAS NYC"; URL="https://legalaidnyc.org"},
    @{Name="Lone Star Legal"; URL="https://lonestarlegal.org"},
    @{Name="Legal Services Miami"; URL="https://legalservicesmiami.org"},
    @{Name="Legal Aid Chicago"; URL="https://legalaidchicago.org"},
    @{Name="Bay Area Legal Services"; URL="https://bals.org"},
    @{Name="Prairie State Legal"; URL="https://pslegal.org"},
    @{Name="HUD Complaint"; URL="https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint"}
)

Write-Host "Testing URLs from Resources Page..." -ForegroundColor Green
Write-Host ""

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $($url.URL) -Method Head -TimeoutSec 10
        Write-Host ("`u2713 $($url.Name): OK ($($response.StatusCode))") -ForegroundColor Green
    } catch {
        Write-Host ("`u2717 $($url.Name): FAILED - $($_.Exception.Message)") -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "URL testing completed." -ForegroundColor Green 