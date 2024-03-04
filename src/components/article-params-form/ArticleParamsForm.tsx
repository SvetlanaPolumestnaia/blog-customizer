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
  
export type AppliedStyles = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	contentWidth: string;
	backgroundColor: string;
} | undefined;

interface ArticleParamsFormProps {
	setStyles: React.Dispatch<React.SetStateAction<AppliedStyles>>;
	setPageStyles: React.Dispatch<React.SetStateAction<PageStyles>>;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ setStyles, setPageStyles }) => {
	// для определения состояния открыая или закрытая форма
	const [isContainerOpen, setIsContainerOpen] = useState(false);
	// сохраняем реф контейнера (для определения клика)
	const containerRef = useRef<HTMLDivElement | null>(null);
	// сохраняем реф селекта (для предотвращения закрытия по клику на селект)
	const selectRootRef = useRef<HTMLDivElement | null>(null);

	// для закрытия форма кликом вне формы
	useEffect(() => {
		if (!isContainerOpen) return;
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
		
		setStyles({
			fontFamily: selectedFontFamily.value,
			fontSize: selectedFontSize.value,
			fontColor: selectedFontColor.value,
			contentWidth: selectedContentWidth.value,
			backgroundColor: selectedBackgroundColor.value,
		});
	
		setPageStyles({
			fontFamilyOption: { value: selectedFontFamily.value },
			fontSizeOption: { value: selectedFontSize.value },
			fontColor: { value: selectedFontColor.value },
			backgroundColor: { value: selectedBackgroundColor.value },
			contentWidth: { value: selectedContentWidth.value },
		});
		setIsContainerOpen(false);
	}

	// сброс формы
	const resetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	  };
	
	// сброс стилей
	const resetStyles = () => {
		setStyles(undefined);
		setPageStyles(defaultArticleState);
		resetForm();
	  };

	return (
		<>	
			<div ref={containerRef}>
				<ArrowButton onClick={handleArrowButtonClick} isContainerOpen={isContainerOpen}/>
				<aside className={`${styles.container} ${isContainerOpen ? styles.container_open : ''}`}>
					<form className={styles.form} onSubmit={handleApplyStyles}>
						<Select
							selected={selectedFontFamily}
							onChange={setFontFamily}
							options={fontFamilyOptions}
							title='Шрифт'
							rootRef={selectRootRef}
						/>
						<RadioGroup
							selected={selectedFontSize}
							name='radio'
							onChange={setFontSize}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
						<Select
							selected={selectedFontColor}
							onChange={setFontColor}
							options={fontColors}
							title='Цвет шрифта'
							rootRef={selectRootRef}
						/>
						<Separator />
						<Select
							selected={selectedBackgroundColor}
							onChange={setBackgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							rootRef={selectRootRef}
						/>
						<Select
							selected={selectedContentWidth}
							onChange={setContentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							rootRef={selectRootRef}
						/>
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