export const CROPS = {
  gloomgourd: {
    id: 'gloomgourd',
    name: 'Gloomgourd',
    description: 'A mysterious gourd that thrives in shadowy conditions',
    color: '#6B46C1',
    icon: '🎃',
    requirements: [
      { crop: 'melon', icon: '🍈', color: '#10B981' },
      { crop: 'pumpkin', icon: '🎃', color: '#F59E0B' }
    ],
    mutationDescription: 'Requires 1 Melon + 1 Pumpkin adjacent to empty unlocked slot',
    adjacency: 'orthogonal or diagonal'
  }
}

export const CROP_TYPES = {
  melon: {
    name: 'Melon',
    icon: '🍈',
    color: '#10B981'
  },
  pumpkin: {
    name: 'Pumpkin',
    icon: '🎃',
    color: '#F59E0B'
  }
}
