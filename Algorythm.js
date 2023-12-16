function makeDigitZero(n) {
    // Chuyển số n thành mảng các chữ số
    const digits = n.toString().split('').map(Number);
    
    // Đếm số bước tối thiểu
    let steps = 0;
    while (n > 0) {
      // Tìm chữ số nhỏ nhất trong n
      const minDigit = Math.min(...digits);
      
      // Trừ n cho chữ số nhỏ nhất và cập nhật n
      n -= minDigit;
      
      // Cập nhật lại mảng digits sau mỗi bước
      digits.length = 0;
      digits.push(...n.toString().split('').map(Number));
      
      // Tăng số bước
      steps++;
    }
    
    return steps;
  }
  
  // Ví dụ sử dụng
  const n = 12345;
  const result = makeDigitZero(n);
  console.log(`Số bước tối thiểu để n=0 là: ${result}`);
  