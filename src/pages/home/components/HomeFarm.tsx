import Land from './Land';

const HomeFarm = () => {
  const currentUnlockedIndex = 1; // index ô đất hiện đang mở (open)

  // Hàm lấy props cho ô đất theo index 0..8
  const getLandProps = (idx: number) => {
    if (idx <= currentUnlockedIndex) {
      return {}; // open (không khóa, không mark)
    }
    if (idx === currentUnlockedIndex + 1) {
      return { isMark: true, isLock: true }; // ô tiếp theo hiển thị mark
    }
    return { isLock: true, isShowLock: true }; // các ô còn lại khoá
  };

  return (
    <div className="grid grid-cols-5 gap-1 w-full h-full rotate-45 origin-center">
      {/* Row 1 */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      {/* Row 2 */}
      <div></div>
      <Land {...getLandProps(1)} />
      <Land {...getLandProps(2)} />
      <Land {...getLandProps(3)} />
      <div></div>

      {/* Row 3 */}
      <div className="relative"></div>
      <Land {...getLandProps(4)} />
      <Land {...getLandProps(5)} />

      <Land {...getLandProps(6)} />
      <div className="relative"></div>

      {/* Row 4 */}
      <div></div>

      <Land {...getLandProps(7)} />

      <Land {...getLandProps(8)} />

      <Land {...getLandProps(9)} />
      <div></div>

      {/* Row 5 */}
      <div></div>
      <div></div>
      <div className="relative"></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default HomeFarm;
