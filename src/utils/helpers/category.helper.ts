import {StoreCategory} from '@/types/entities';

export function getChainCategory(
  category: Pick<StoreCategory, '_id' | 'name' | 'parent'> | StoreCategory,
): string {
  const result = category.name;
  if (category.parent) {
    return `${getChainCategory(category.parent)} > ${result}`;
  }
  return result;
}

// export const renderCategory = (
//   category: Pick<StoreCategory, 'name' | '_id' | 'parent'>,
// ): React.ReactNode => {
//   return (
//     <>
//       {category.parent && renderCategory(category.parent)}
//       {category.parent && (
//         <AnimatedIcon
//           type="EvilIcons"
//           name={ICON.EvilIcons.arrowRight}
//           size={hp(2.4)}
//         />
//       )}
//       <TextNormalComponent variant="primary">
//         {category.name}
//       </TextNormalComponent>
//     </>
//   );
// };
