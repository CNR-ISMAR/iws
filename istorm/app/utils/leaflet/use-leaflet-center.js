// @flow
import { useState, useCallback, useEffect } from "react"
import { useLeafletMap } from "./use-leaflet-map"

const getMapCenter = map => {
	const { lat, lng } = map.getCenter()
	return [lat, lng]
}

/**
 * React hook for getting current center of react-leaflet [Map](https://react-leaflet.js.org/docs/en/components.html#map).
 *
 * ```javascript
 * const MyComponent = () => {
 *   const [lat, lng] = useLeafletCenter()
 *   return ...
 * }
 * ```
 *
 * @returns [lat, lng] of the map center.
 */

export const useLeafletCenter = (): [number, number] => {
	const map = useLeafletMap()
	const [center, setCenterState] = useState(() => map && getMapCenter(map))
	const onLeafletMove = useCallback(() => setCenterState(map && getMapCenter(map)), [setCenterState, map])
	useEffect(() => {
		if (map) map.on("moveend", onLeafletMove)
		return () => {
			if (map) map.off("moveend", onLeafletMove)
		}
	}, [map, onLeafletMove])
	return center || [0, 0]
}
