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
	const [isContainerOpen, setIsContainerOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const selectRootRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOverlay = (e: MouseEvent) => {		
			if (isContainerOpen && 
				containerRef.current && 
				!containerRef.current.contains(e.target as Node) &&
				!selectRootRef.current?.contains(e.target as Node) ) {
				setIsContainerOpen(false)
			}
		}
		document.addEventListener('click', handleClickOverlay)
		return () => {
			document.removeEventListener('click', handleClickOverlay)
		}
	}, [isContainerOpen, containerRef, selectRootRef])

	const handleArrowButtonClick = () => {
		setIsContainerOpen(!isContainerOpen);
	}

	const defaultStyles = {
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	  };
	
	  const [selectedFontSize, setFontSize] = useState(defaultStyles.fontSizeOption);
	  const [selectedFontFamily, setFontFamily] = useState(defaultStyles.fontFamilyOption);
	  const [selectedFontColor, setFontColor] = useState(defaultStyles.fontColor);
	  const [selectedBackgroundColor, setBackgroundColor] = useState(defaultStyles.backgroundColor);
	  const [selectedContentWidth, setContentWidth] = useState(defaultStyles.contentWidth);


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
	const resetForm = () => {
		setFontFamily(defaultStyles.fontFamilyOption);
		setFontSize(defaultStyles.fontSizeOption);
		setFontColor(defaultStyles.fontColor);
		setBackgroundColor(defaultStyles.backgroundColor);
		setContentWidth(defaultStyles.contentWidth);
	  };
	const resetStyles = () => {
		document.documentElement.style.setProperty('--font-family', defaultStyles.fontFamilyOption.value);
		document.documentElement.style.setProperty('--font-size', defaultStyles.fontSizeOption.value);
		document.documentElement.style.setProperty('--font-color', defaultStyles.fontColor.value);
		document.documentElement.style.setProperty('--container-width', defaultStyles.contentWidth.value);
		document.documentElement.style.setProperty('--bg-color', defaultStyles.backgroundColor.value);

		setStyles(false);
		setPageStyles(defaultStyles);
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