import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm, PageStyles, AppliedStyles } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
export const root = createRoot(domNode);

const App = () => {
	// добавляем стейты стилей и страницы
	const [appliedStyles, setStyles] = useState<AppliedStyles | undefined>(undefined);
	const [pageStyles, setPageStyles] = useState<PageStyles>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				appliedStyles && {
				  '--font-family': pageStyles.fontFamilyOption.value,
				  '--font-size': pageStyles.fontSizeOption.value,
				  '--font-color': pageStyles.fontColor.value,
				  '--container-width': pageStyles.contentWidth.value,
				  '--bg-color': pageStyles.backgroundColor.value,
				} as CSSProperties
			  }
			>
			<ArticleParamsForm setStyles={setStyles} setPageStyles={setPageStyles}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);