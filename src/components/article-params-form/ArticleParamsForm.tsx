import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, defaultArticleState } from '../../constants/articleProps';

import { useState, useRef, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';

export type OptionType = {
	value: string;
  };

export type PageStyles = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
  };
  
interface ArticleParamsFormProps {
	setStyles: React.Dispatch<React.SetStateAction<boolean>>;
	setPageStyles: React.Dispatch<React.SetStateAction<PageStyles>>;
  }

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ setStyles, setPageStyles }) => {
	// для определения состояния открыая или закрытая форма
	const [isContainerOpen, setIsContainerOpen] = useState(false);
	// сохраняем реф контейнера (для определения клика)
	const containerRef = useRef<HTMLDivElement | null>(null);
	// сохраняем реф селекта (для предотвращения закрытия по клику на селект)
	const selectRootRef = useRef<HTMLDivElement | null>(null);

	// для закрытия форма кликом вне формы
	useEffect(() => {
		const handleClickOutsideForm = (e: MouseEvent) => {		
			if (isContainerOpen && 
				containerRef.current && 
				!containerRef.current.contains(e.target as Node) &&
				!selectRootRef.current?.contains(e.target as Node) ) {
				setIsContainerOpen(false)
			}
		}
		document.addEventListener('click', handleClickOutsideForm)
		return () => {
			document.removeEventListener('click', handleClickOutsideForm)
		}
	}, [isContainerOpen, containerRef, selectRootRef])

	// для открытия формы
	const handleArrowButtonClick = () => {
		setIsContainerOpen(!isContainerOpen);
	}
	
	// создание состояний стилей
	const [selectedFontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [selectedFontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption);
	const [selectedFontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [selectedBackgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const [selectedContentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);

	// применение стилей к странице
	const handleApplyStyles = (e: React.FormEvent) => {
		e.preventDefault();
		document.documentElement.style.setProperty('--font-family', selectedFontFamily.value);
		document.documentElement.style.setProperty('--font-size', selectedFontSize.value);
		document.documentElement.style.setProperty('--font-color', selectedFontColor.value);
		document.documentElement.style.setProperty('--container-width', selectedContentWidth.value);
		document.documentElement.style.setProperty('--bg-color', selectedBackgroundColor.value);
	
		setIsContainerOpen(false);
		setStyles(true);
		setPageStyles({
			fontFamilyOption: {
			  value: selectedFontFamily.value,
			},
			fontSizeOption: {
			  value: selectedFontSize.value,
			},
			fontColor: {
			  value: selectedFontColor.value,
			},
			backgroundColor: {
			  value: selectedBackgroundColor.value,
			},
			contentWidth: {
			  value: selectedContentWidth.value,
			},
		  });
		
	}

	// сброс формы
	const resetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	  };
	
	// сброси стилей
	const resetStyles = () => {
		document.documentElement.style.setProperty('--font-family', defaultArticleState.fontFamilyOption.value);
		document.documentElement.style.setProperty('--font-size', defaultArticleState.fontSizeOption.value);
		document.documentElement.style.setProperty('--font-color', defaultArticleState.fontColor.value);
		document.documentElement.style.setProperty('--container-width', defaultArticleState.contentWidth.value);
		document.documentElement.style.setProperty('--bg-color', defaultArticleState.backgroundColor.value);

		setStyles(false);
		setPageStyles(defaultArticleState);
		resetForm();
	  };

	return (
		<>	
			<div ref={containerRef}>
				<ArrowButton onClick={handleArrowButtonClick}/>
				<aside  className={`${styles.container} ${isContainerOpen ? styles.container_open : ''}`}>
					<form className={styles.form} onSubmit={handleApplyStyles}>
						<div>
							<Select
								selected={selectedFontFamily}
								onChange={setFontFamily}
								options={fontFamilyOptions}
								title='Шрифт'
								rootRef={selectRootRef}
							/>
						</div>
						<div>
							<RadioGroup
								selected={selectedFontSize}
								name='radio'
								onChange={setFontSize}
								options={fontSizeOptions}
								title='Размер шрифта'
							/>
						</div>
						<div>
							<Select
								selected={selectedFontColor}
								onChange={setFontColor}
								options={fontColors}
								title='Цвет шрифта'
								rootRef={selectRootRef}
							/>
						</div>
						<div>
							<Separator />
						</div>
						<div>
							<Select
								selected={selectedBackgroundColor}
								onChange={setBackgroundColor}
								options={backgroundColors}
								title='Цвет фона'
								rootRef={selectRootRef}
							/>
						</div>
						<div>
							<Select
								selected={selectedContentWidth}
								onChange={setContentWidth}
								options={contentWidthArr}
								title='Ширина контента'
								rootRef={selectRootRef}
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={resetStyles}/>
							<Button title='Применить' type='submit'/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};