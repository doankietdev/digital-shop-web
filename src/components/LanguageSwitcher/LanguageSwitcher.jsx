import { useContext, useEffect, useState } from 'react';
import LanguageContext from '~/contexts/LanguageContext';
import { languageMap } from '~/utils/constants';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className='inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={languageMap[language]?.flag}
            alt={languageMap[language]?.name}
            className='w-6 h-6'
          />
        </button>
      </div>

      {isOpen && (
        <div
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex='-1'
        >
          <div className='py-1' role='none'>
            {Object.entries(languageMap).map(([lang, { name, flag }]) => (
              <button
                key={lang}
                className={`flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left ${
                  language === lang ? 'bg-gray-100' : ''
                }`}
                role='menuitem'
                tabIndex='-1'
                onClick={() => handleLanguageChange(lang)}
              >
                <img src={flag} alt={name} className='w-5 h-5 mr-2' />
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;