return !(region.x >= REGION.x + REGION.w ||
 region.x + region.w <= REGION.x ||
 region.y >= REGION.y + REGION.h ||
 region.y + region.h <= REGION.y)