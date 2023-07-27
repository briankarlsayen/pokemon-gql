interface IStatusBar {
  value: number;
  title?: string;
}

export default function StatsBar({ value, title }: IStatusBar) {
  const MAX_VAL = 255;
  const TOTAL_MAX_VAL = 1530;
  return (
    <div className='grid grid-cols-4 items-center w-full'>
      <p className='col-span-1 text-left'>{title}</p>
      <div className='tooltip col-span-3' data-tip={value}>
        <progress
          className='progress'
          value={value}
          max={title === 'Tot' ? TOTAL_MAX_VAL : MAX_VAL}
        ></progress>
        <p></p>
      </div>
    </div>
  );
}
