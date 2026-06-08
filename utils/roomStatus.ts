export function isRoomOccupied(room: any): boolean {
  if (!room.applications || room.applications.length === 0) {
    return false
  }

  const now = new Date()
  now.setHours(0, 0, 0, 0) // Reset time to start of today for precise date comparison

  return room.applications.some((app: any) => {
    if (app.status !== 'approved') return false

    const personalInfo = app.personal_info || {}
    const moveInDateStr = personalInfo.moveInDate
    if (!moveInDateStr) return false

    const moveInDate = new Date(moveInDateStr)
    
    // Parse length of stay, defaulting to 12 months if it's 'other' or invalid
    let lengthOfStayMonths = parseInt(personalInfo.lengthOfStay)
    if (isNaN(lengthOfStayMonths) || lengthOfStayMonths <= 0) {
      lengthOfStayMonths = 12
    }

    const endDate = new Date(moveInDate)
    endDate.setMonth(endDate.getMonth() + lengthOfStayMonths)

    // The contract is active if the end date is today or in the future
    return endDate >= now
  })
}

export function getEffectiveRoomStatus(room: any): 'available' | 'occupied' | 'unavailable' {
  if (isRoomOccupied(room)) {
    return 'occupied'
  }
  
  // If the database has it as 'occupied' but there's no active approved application,
  // we treat it as 'available'. Otherwise, return the database status.
  if (room.status === 'occupied') {
    return 'available'
  }
  
  return room.status || 'available'
}
