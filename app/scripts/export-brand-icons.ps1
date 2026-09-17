param([string]$Output = "public")

Add-Type -AssemblyName System.Drawing

$outputPath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\$Output"))
$background = [System.Drawing.Color]::FromArgb(255, 23, 25, 28)
$ivory = [System.Drawing.Color]::FromArgb(255, 241, 241, 238)

function New-RoundedPath([float]$size, [float]$radius) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $diameter = $radius * 2
  $path.AddArc(0, 0, $diameter, $diameter, 180, 90)
  $path.AddArc($size - $diameter, 0, $diameter, $diameter, 270, 90)
  $path.AddArc($size - $diameter, $size - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc(0, $size - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function Export-Icon([int]$size, [string]$name, [float]$markWidth, [bool]$maskable = $false) {
  $bitmap = [System.Drawing.Bitmap]::new($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Transparent)

  $brush = [System.Drawing.SolidBrush]::new($background)
  if ($maskable) {
    $graphics.FillRectangle($brush, 0, 0, $size, $size)
  } else {
    $shape = New-RoundedPath $size ($size * 0.22)
    $graphics.FillPath($brush, $shape)
    $shape.Dispose()
  }

  $scale = ($size * $markWidth) / 698
  $markHeight = 573 * $scale
  $matrix = [System.Drawing.Drawing2D.Matrix]::new()
  $matrix.Translate(($size - 698 * $scale) / 2 - 285 * $scale, ($size - $markHeight) / 2 - 229 * $scale)
  $matrix.Scale($scale, $scale)

  $center = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $center.AddLine(505, 408, 601, 248)
  $center.AddBezier(601, 248, 612, 229, 641, 229, 653, 248)
  $center.AddLine(653, 248, 749, 408)
  $center.AddLine(749, 408, 627, 670)
  $center.CloseFigure()
  $center.Transform($matrix)

  $left = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $left.AddLine(482, 450, 537, 584)
  $left.AddLine(537, 584, 430, 774)
  $left.AddBezier(430, 774, 420, 791, 402, 802, 381, 802)
  $left.AddLine(381, 802, 304, 802)
  $left.AddBezier(304, 802, 285, 802, 275, 788, 285, 771)
  $left.AddLine(285, 771, 482, 450)
  $left.CloseFigure()
  $left.Transform($matrix)

  $right = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $right.AddLine(773, 450, 973, 771)
  $right.AddBezier(973, 771, 983, 788, 975, 802, 955, 802)
  $right.AddLine(955, 802, 874, 802)
  $right.AddBezier(874, 802, 853, 802, 835, 791, 825, 774)
  $right.AddLine(825, 774, 717, 584)
  $right.AddLine(717, 584, 773, 450)
  $right.CloseFigure()
  $right.Transform($matrix)

  $ivoryBrush = [System.Drawing.SolidBrush]::new($ivory)
  $graphics.FillPath($ivoryBrush, $center)
  $graphics.FillPath($ivoryBrush, $left)
  $graphics.FillPath($ivoryBrush, $right)
  $bitmap.Save((Join-Path $outputPath $name), [System.Drawing.Imaging.ImageFormat]::Png)
  $matrix.Dispose()
  $center.Dispose()
  $left.Dispose()
  $right.Dispose()
  $ivoryBrush.Dispose()
  $brush.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

Export-Icon 16 "favicon-16.png" 0.78
Export-Icon 32 "favicon-32.png" 0.76
Export-Icon 180 "apple-touch-icon.png" 0.72
Export-Icon 192 "icon-192.png" 0.72
Export-Icon 512 "icon-512.png" 0.72
Export-Icon 512 "icon-maskable.png" 0.58 $true

$pngBytes = [System.IO.File]::ReadAllBytes((Join-Path $outputPath "favicon-32.png"))
$icoPath = Join-Path $outputPath "favicon.ico"
$stream = [System.IO.File]::Create($icoPath)
$writer = [System.IO.BinaryWriter]::new($stream)
$writer.Write([uint16]0)
$writer.Write([uint16]1)
$writer.Write([uint16]1)
$writer.Write([byte]32)
$writer.Write([byte]32)
$writer.Write([byte]0)
$writer.Write([byte]0)
$writer.Write([uint16]1)
$writer.Write([uint16]32)
$writer.Write([uint32]$pngBytes.Length)
$writer.Write([uint32]22)
$writer.Write($pngBytes)
$writer.Dispose()
