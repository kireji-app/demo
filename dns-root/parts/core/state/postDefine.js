// This is the path-segment max.

function sumGeometricSeries(base, maxLength) {
 base = BigInt(base)
 maxLength = BigInt(maxLength)
 return (base ** (maxLength + 1n) - base) / (base - 1n)
}

part.size = sumGeometricSeries(Framework.maxSegmentLength, Framework.segmentRadix.length)