import SheetContent from '@/components/atoms/SheetContent/SheetContent';
import { Dispatch, ReactNode } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import CustomBottomSheetWrapper from './style';

interface CustomBottomSheetProps {
	children: ReactNode;
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
}

function CustomBottomSheet({ children, open, setOpen }: CustomBottomSheetProps) {
	return (
		<CustomBottomSheetWrapper>
			<BottomSheet
				open={open}
				onDismiss={() => {
					setOpen(false);
				}}
			>
				<SheetContent>{children}</SheetContent>
			</BottomSheet>
		</CustomBottomSheetWrapper>
	);
}

export default CustomBottomSheet;
