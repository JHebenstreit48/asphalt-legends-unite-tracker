import '@/CSS/Manufacturer.css';
import { abc } from './Brands';
import { BrandDescription } from './ManufacturersInfo';

function handleScroll(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, letterKey: string) {
  event.preventDefault();
  const element = document.getElementById(letterKey);
  if (element) {
    element.scrollIntoView({ behavior: 'instant' });
  }
}

export default function abcList() {
  return (
    <div>
      {/* X axis with all letters */}
      <div className='jumpList'>
        {abc.map((letter) => (
          <a
            key={letter.letterKey}
            className='brandAlphabetical'
            href={`#${letter.letterKey}`}
            onClick={(event) => handleScroll(event, letter.letterKey)}
          >
            {letter.letterKey}
          </a>
        ))}
      </div>

      {/* Y axis or vertical axis with all brands and descriptions */}
      <div className='manufacturerLetter'>
        {abc.map((abc) => (
          <div key={abc.letterKey} id={abc.letterKey}>

            <h2 className='alphabetList'>
              {abc.letterKey}
            </h2>

            {/* ABC BRANDS */}
            {abc.brands.map((brand) => (
              <BrandDescription key={brand.brandsKey} {...brand} />
            ))}

          </div>
        ))}
      </div>
    </div>
  );
}

