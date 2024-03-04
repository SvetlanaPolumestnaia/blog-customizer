import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm, PageStyles } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
export const root = createRoot(domNode);

const App = () => {
	const [appliedStyles, setStyles] = useState(false);
	const [pageStyles, setPageStyles] = useState<PageStyles>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedStyles ? pageStyles.fontFamilyOption.value : defaultArticleState.fontFamilyOption.value,
					'--font-size': appliedStyles ? pageStyles.fontSizeOption.value : defaultArticleState.fontSizeOption.value,
					'--font-color': appliedStyles ? pageStyles.fontColor.value : defaultArticleState.fontColor.value,
					'--container-width': appliedStyles ? pageStyles.contentWidth.value : defaultArticleState.contentWidth.value,
					'--bg-color': appliedStyles ? pageStyles.backgroundColor.value : defaultArticleState.backgroundColor.value,
        } as CSSProperties
			}>
			<ArticleParamsForm setStyles={setStyles} setPageStyles={setPageStyles}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);