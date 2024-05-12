import {
  DataColorsAppDropDown,
  OptionUnit,
  UnitMedicine,
  UnitTree,
} from '@/types/commons';

export const OPTIONS_UNITS: DataColorsAppDropDown<OptionUnit>[] = [
  {label: 'Viên', value: ['PILL']},
  {label: 'Vỉ', value: ['BLISTER']},
  {label: 'Vỉ - Viên', value: ['BLISTER', 'PILL']},
  {label: 'Chai', value: ['CAN', 'BOX', 'BOTTLE']},
  {label: 'Chai - ml', value: ['BOTTLE', 'ML']},
  {label: 'Gói', value: ['PACK']},
  {label: 'Tuýp', value: ['TUBE']},
  {label: 'Tuýp - Gram', value: ['TUBE', 'GRAM']},
  {label: 'Cái', value: ['PIECE']},
  {label: 'Hộp', value: ['BOX']},

  {label: 'Hộp - Vỉ', value: ['BOX', 'BLISTER']},
  {label: 'Hộp - Viên', value: ['BOX', 'PILL']},
  {label: 'Hộp - Vỉ - Viên', value: ['BOX', 'BLISTER', 'PILL']},
  {label: 'Hộp - Chai', value: ['BOX', 'BOTTLE']},
  {label: 'Hộp - ml', value: ['BOX', 'ML']},
  {label: 'Hộp - Chai - ml', value: ['BOX', 'BOTTLE', 'ML']},
  {label: 'Hộp - Gói', value: ['BOX', 'PACK']},
  {label: 'Hộp - Cái', value: ['BOX', 'PIECE']},
  {label: 'Hộp - Tuýp', value: ['BOX', 'TUBE']},
  {label: 'Hộp - Tuýp - Gram', value: ['BOX', 'TUBE', 'GRAM']},

  {label: 'Thùng - Hộp', value: ['CAN', 'BOX']},
  {label: 'Thùng - Hộp - Vỉ', value: ['CAN', 'BOX', 'BLISTER']},
  {label: 'Thùng - Hộp - Viên', value: ['CAN', 'BOX', 'PILL']},
  {label: 'Thùng - Hộp - Vỉ - Viên', value: ['CAN', 'BOX', 'BLISTER', 'PILL']},
  {label: 'Thùng - Hộp - Chai', value: ['CAN', 'BOX', 'BOTTLE']},
  {
    label: 'Thùng - Hộp - Chai - ml',
    value: ['CAN', 'BOX', 'BOTTLE', 'ML'],
  },
  {label: 'Thùng - Hộp - Gói', value: ['CAN', 'BOX', 'PACK']},
  {label: 'Thùng - Hộp - Tuýp', value: ['CAN', 'BOX', 'TUBE']},
  {label: 'Thùng - Hộp - Tuýp - Gram', value: ['CAN', 'BOX', 'TUBE', 'GRAM']},
  {label: 'Thùng - Hộp - Cái', value: ['CAN', 'BOX', 'PIECE']},
  {label: 'Thùng - Cái', value: ['CAN', 'PIECE']},
];

export const TRANSFORM_LABEL_UNITS: Record<UnitMedicine, string> = {
  CAN: 'Thùng',
  BOX: 'Hộp',
  BLISTER: 'Vỉ',
  PILL: 'Viên',
  BOTTLE: 'Chai',
  PACK: 'Gói',
  TUBE: 'Tuýp',
  PIECE: 'Cái',
  ML: 'ml',
  GRAM: 'g',
};

export const dataUnitTree: UnitTree[] = [
  {
    unit: 'CAN',
    children: [
      {
        unit: 'BOX',
        children: [
          {
            unit: 'BLISTER',
            children: [
              {
                unit: 'PILL',
                children: [
                  {
                    unit: 'GRAM',
                  },
                ],
              },
            ],
          },
          {
            unit: 'BOTTLE',
            children: [
              {
                unit: 'PILL',
                children: [
                  {
                    unit: 'GRAM',
                  },
                ],
              },
              {
                unit: 'ML',
              },
              {unit: 'GRAM'},
              {
                unit: 'PIECE',
                children: [
                  {
                    unit: 'GRAM',
                  },
                ],
              },
            ],
          },
          {
            unit: 'PILL',
            children: [
              {
                unit: 'GRAM',
              },
            ],
          },
          {
            unit: 'PIECE',
            children: [
              {
                unit: 'GRAM',
              },
            ],
          },
          {
            unit: 'PACK',
            children: [
              {
                unit: 'GRAM',
              },
              {
                unit: 'ML',
              },
            ],
          },
          {
            unit: 'TUBE',
            children: [
              {
                unit: 'GRAM',
              },
              {
                unit: 'ML',
              },
            ],
          },
        ],
      },
      {
        unit: 'BOTTLE',
        children: [
          {
            unit: 'PILL',
            children: [
              {
                unit: 'GRAM',
              },
            ],
          },
          {
            unit: 'ML',
          },
          {unit: 'GRAM'},
          {
            unit: 'PIECE',
            children: [
              {
                unit: 'GRAM',
              },
            ],
          },
        ],
      },
      {
        unit: 'PIECE',
        children: [
          {
            unit: 'GRAM',
          },
        ],
      },

      {
        unit: 'PACK',
        children: [
          {
            unit: 'GRAM',
          },
          {
            unit: 'ML',
          },
        ],
      },
    ],
  },

  // ** BOX
  {
    unit: 'BOX',
    children: [
      {
        unit: 'BLISTER',
        children: [
          {
            unit: 'PILL',
            children: [
              {
                unit: 'GRAM',
              },
            ],
          },
        ],
      },
      {
        unit: 'BOTTLE',
        children: [
          {
            unit: 'PILL',
            children: [
              {
                unit: 'GRAM',
              },
            ],
          },
          {
            unit: 'ML',
          },
          {unit: 'GRAM'},
          {
            unit: 'PIECE',
            children: [
              {
                unit: 'GRAM',
              },
            ],
          },
        ],
      },
      {
        unit: 'PILL',
        children: [
          {
            unit: 'GRAM',
          },
        ],
      },
      {
        unit: 'PIECE',
        children: [
          {
            unit: 'GRAM',
          },
        ],
      },
      {
        unit: 'PACK',
        children: [
          {
            unit: 'GRAM',
          },
          {
            unit: 'ML',
          },
        ],
      },
      {
        unit: 'TUBE',
        children: [
          {
            unit: 'GRAM',
          },
          {
            unit: 'ML',
          },
        ],
      },
    ],
  },

  // ** BOTTLE
  {
    unit: 'BOTTLE',
    children: [
      {
        unit: 'PILL',
        children: [
          {
            unit: 'GRAM',
          },
        ],
      },
      {
        unit: 'ML',
      },
      {unit: 'GRAM'},
      {
        unit: 'PIECE',
        children: [
          {
            unit: 'GRAM',
          },
        ],
      },
    ],
  },

  // ** BLISTER
  {
    unit: 'BLISTER',
    children: [
      {
        unit: 'PILL',
        children: [
          {
            unit: 'GRAM',
          },
        ],
      },
    ],
  },

  // ** PILL
  {
    unit: 'PILL',
    children: [
      {
        unit: 'GRAM',
      },
    ],
  },

  // ** PACK
  {
    unit: 'PACK',
    children: [
      {
        unit: 'GRAM',
      },
      {
        unit: 'ML',
      },
    ],
  },

  // ** TUBE
  {
    unit: 'TUBE',
    children: [
      {
        unit: 'GRAM',
      },
      {
        unit: 'ML',
      },
    ],
  },

  // ** PIECE
  {
    unit: 'PIECE',
    children: [
      {
        unit: 'GRAM',
      },
    ],
  },

  // ** ML
  {
    unit: 'ML',
  },

  // ** GRAM
  {
    unit: 'GRAM',
  },
];
