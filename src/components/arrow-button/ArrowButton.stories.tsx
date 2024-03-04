import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton, OnClick } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	
	render: () => {
		const handleButtonClick: OnClick = () => {
            alert('storybook works')
        };

		return (
			<>
				<ArrowButton onClick={handleButtonClick}/>
			</>
		);
	},
};
