Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\jamma\.gemini\antigravity\brain\31aed044-3635-44fa-82ab-b074220d1af4\.user_uploaded\media_1794461431645_69af3d61.png"
$outputPath = "public\logo.png"

$src = [System.Drawing.Bitmap]::new($inputPath)
$w = $src.Width
$h = $src.Height

$minX = 9999
$maxX = 0
$minY = 9999
$maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $src.GetPixel($x, $y)
        # If pixel has alpha AND is not white
        if ($p.A -gt 30 -and (-not ($p.R -gt 240 -and $p.G -gt 240 -and $p.B -gt 240))) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Real bird boundaries: X=[$minX, $maxX], Y=[$minY, $maxY]"
$birdW = $maxX - $minX + 1
$birdH = $maxY - $minY + 1
Write-Host "Bird Width: $birdW, Height: $birdH"

# Add padding
$pad = 6
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropR = [Math]::Min($w - 1, $maxX + $pad)
$cropB = [Math]::Min($h - 1, $maxY + $pad)

$cropW = $cropR - $cropX + 1
$cropH = $cropB - $cropY + 1

$cropped = [System.Drawing.Bitmap]::new($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $origP = $src.GetPixel($cropX + $x, $cropY + $y)
        # If transparent or near-white, keep 100% transparent
        if ($origP.A -lt 30 -or ($origP.R -gt 240 -and $origP.G -gt 240 -and $origP.B -gt 240)) {
            $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $cropped.SetPixel($x, $y, $origP)
        }
    }
}

$src.Dispose()
$cropped.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()

Write-Host "Saved tightly cropped transparent logo: ${cropW}x${cropH} to $outputPath"
