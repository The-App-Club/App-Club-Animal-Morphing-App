import SVGPathCommander from "svg-path-commander";

const a = `M1 113C7.83333 132.667 4 188 50.5 189C76.9939 189.57 102.055 148.324 126.555 138.324C153.489 127.331 149 -56.5 67 18.5C-15 93.5 5.5 34 15.0001 29C21 21.5 38 18.5 43.5 34.9999C30.5 40.5 14 39.5 8.99999 32.5C3.99999 21 -0.0124836 4.00012 26.5553 6.32433C76.5 10.6936 40.736 34.508 29 64.5C20 87.5 47 78.5 56.5 78.5C64.1 78.5 69.1667 85.6666 70.5 87.5M21 113C25.1667 111.5 33.3 102.2 40.5 107C44 109.333 48.0746 107.606 50.5 107C54.5 106 56.5 111.5 72.5 116.5C85.3 120.5 87 121.333 87.5 120.5C76 132.833 40.5 139.5 20.5 115C29 118.333 51.5 121.5 90 120.5M80 34.9999C91.5 18.5 113 18 128 39C121.5 40.5 98 45 80 34.9999Z`;

const b = `M25 130.5C37 139 42 174 80 178.5C106.316 181.616 119 171 120.5 169.5C139.182 150.819 143.353 -87.9039 66.7648 37.4225C28.2648 100.422 5.50001 70.5001 14 50.0001C17.5 40.0001 40 26.5001 53.5 51.0001C38 55.5001 22.5 57.0001 10.7647 50.9222C-15.8336 37.1465 19.522 13.9678 46.0781 16.4222C94.7649 20.9222 81.8113 46.4215 100 73C113.687 93 86.3123 89.1578 83.5 90C74.1999 92.7853 73 91 72 89M50 127.5C55 127.5 76 114 80 113C91.1566 110.211 91.5 117 93.5 115.5C95.5 114 97.5 111.771 103 113C106.5 113.782 120 128.333 120.5 127.5C119.5 131.5 78.5 141 48.5 126.5C60.4997 133.5 80.5 112 123 128.5M90.7649 48.0001C95.2649 38.5001 120.928 21.5001 127.428 51.0001C120 53.0001 111.5 54.0001 90.7649 48.0001Z`;

const c = `M39.5 134.5C51.5 143 39.5 171.5 77.5 176C103.816 179.116 110 142 134.5 132C161.433 121.007 172.105 -67.395 60 27.5C10 69.8243 -4.49997 40.5 5.00007 35.5C11 30 25 32 34.5 39C21.5001 49 9.99998 44.5 7.00002 36C2.00002 24.5 -8.49999 11.9999 18 14.9999C44.5 17.9999 39.3478 59.5328 30.5 90.5C23.5 115 48 106.5 57.5554 102.5C66.5107 98.7512 68.1667 103.667 69.5 105.5M41.5 118.5C46.5 118.5 54.5554 122 57.5554 124C59.8054 125.5 64.5 124.5 66.5 123C68.5 121.5 75 121.271 80.5 122.5C84 123.282 99 121.833 99.5 121C92.5 134 49 154 42 119.5C52.5 128 61 133 103 120M75.5 38C82.5554 37 105.5 38 123.5 31.5C116.5 44.5 91.5 60.5 75.5 38Z`;

const d = `M23.0001 152.5C35.0001 161 37.0001 191.5 75.0001 196C101.316 199.116 99.5 169 114 149.5C131.358 126.156 142.089 -85.3262 65.4999 40.0001C26.9999 103 -10.5002 60.4999 11.4998 49.5004C17.4998 44.0004 42.5001 47.0004 53 49.5004C41.5501 66.4999 20.4999 60.76 9.49985 53.4999C-15.5001 36.9999 18.2571 16.5455 44.8132 18.9999C93.5 23.4999 84.3487 70.6738 96.5 100.5C107.5 127.5 70.5759 110.924 68.5 113C67 114.5 67.5 115 67.5 116.5M41 139C46 139 57.5 140 61.5 139C72.6566 136.211 75.5 141.5 77.5 140C79.5 138.5 81.5 137.771 87 139C90.5 139.782 105.5 132.833 106 132C98.5 157.5 70.5 166.5 42 139C69.5 140 74 157 107.5 131M97.4998 49.5001C106.313 42.0001 115.5 46.5 133.5 40C126.5 53 117 69.5001 97.4998 49.5001Z`;

console.log(new SVGPathCommander(a).segments.length);
console.log(new SVGPathCommander(b).segments.length);
console.log(new SVGPathCommander(c).segments.length);
console.log(new SVGPathCommander(d).segments.length);