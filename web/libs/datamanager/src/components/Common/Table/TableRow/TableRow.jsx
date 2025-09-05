import { observer } from "mobx-react";
import React from "react";
import { cn } from "../../../../utils/bem";
import { FF_LOPS_E_3, isFF } from "../../../../utils/feature-flags";
import { normalizeCellAlias } from "../../../CellViews";
import { SkeletonLoader } from "../../SkeletonLoader";
import "./TableRow.scss";
import { TableContext, tableCN } from "../TableContext";
import { getProperty, getStyle } from "../utils";

const CellRenderer = observer(({ col: colInput, data, decoration, cellViews }) => {
  const { Header: _, Cell, id, ...col } = colInput;

  if (Cell instanceof Function) {
    const { headerClassName: _, cellClassName, ...rest } = col;

    return (
      <span className={tableCN.elem("cell").mix(cellClassName).toString()} {...rest} key={id}>
        <Cell data={data} />
      </span>
    );
  }

  const valuePath = id.split(":")[1] ?? id;
  const altType = normalizeCellAlias(valuePath);
  const value = getProperty(data, valuePath);

  const Renderer = cellViews[altType] ?? cellViews[col.original.currentType] ?? cellViews.String;
  const renderProps = { column: col, original: data, value };
  const Decoration = decoration?.get?.(col);
  const style = getStyle(cellViews, col, Decoration);
  const cellIsLoading = isFF(FF_LOPS_E_3) && data.loading === colInput.alias;

  return (
    <div className={tableCN.elem("cell").toString()}>
      <div
        style={{
          ...(style ?? {}),
          display: "inline-flex",
          height: "100%",
          alignItems: cellIsLoading ? "" : "center",
          color: "black",
        }}
      >
        {cellIsLoading ? <SkeletonLoader /> : Renderer ? <Renderer {...renderProps} /> : value}
      </div>
    </div>
  );
});

export const TableRow = observer(({ data, even, style, wrapperStyle, onClick, stopInteractions, decoration }) => {
  const { columns, cellViews } = React.useContext(TableContext);
  const rowWrapperCN = tableCN.elem("row-wrapper");
  const tableRowCN = cn("table-row");
  const mods = {
    even,
    selected: data.isSelected,
    highlighted: data.isHighlighted,
    loading: data.isLoading,
    disabled: stopInteractions,
  };

  // Find specific columns for card layout
  const selectColumn = columns.find(col => col.id === 'select');
  const showSourceColumn = columns.find(col => col.id === 'show-source');
  const idColumn = columns.find(col => col.id === 'id' || col.alias === 'id');
  const imageColumn = columns.find(col => col.id === 'image' || col.alias === 'image');
  
  // Get all other columns (excluding select, show-source, id, image)
  const otherColumns = columns.filter(col => 
    col.id !== 'select' && 
    col.id !== 'show-source' && 
    col.id !== 'id' && 
    col.alias !== 'id' &&
    col.id !== 'image' && 
    col.alias !== 'image'
  );

  // Find specific columns for better layout
  const completedColumn = otherColumns.find(col => col.id === 'completed' || col.alias === 'completed' || col.id === 'completed_at');
  const annotatorsColumn = otherColumns.find(col => col.id === 'annotators' || col.alias === 'annotators' || col.id === 'annotated_by');

  return (
    <div className={rowWrapperCN.mod(mods).toString()} style={wrapperStyle} onClick={(e) => onClick?.(data, e)}>
      <div className={tableRowCN.toString()} style={style} data-leave={true}>
        {/* Image Section - Top of Card */}
        {imageColumn && (
          <div style={{ 
            marginBottom: '16px', 
            borderRadius: '12px', 
            overflow: 'hidden',
            width: '100%',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            position: 'relative',
            padding: '20px'
          }}>
            <div style={{
              width: '240px',
              height: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <CellRenderer col={imageColumn} data={data} cellViews={cellViews} decoration={decoration} />
            </div>
          </div>
        )}

        {/* ID Section */}
        {idColumn && (
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
            ID: {data.id}
          </div>
        )}

        {/* Date Section */}
        <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '400', marginBottom: '12px' }}>
          Date: {completedColumn ? (
            completedColumn.Cell ? (
              <CellRenderer col={completedColumn} data={data} cellViews={cellViews} decoration={decoration} />
            ) : (
              new Date(data.completed_at || data.completed || data.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })
            )
          ) : (
            new Date(data.completed_at || data.completed || data.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          )}
        </div>

        {/* Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{
            background: data.isCompleted || data.completed_at ? '#10b981' : '#f59e0b',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {data.isCompleted || data.completed_at ? '✓' : '★'} {data.isCompleted || data.completed_at ? 'Completed' : 'Annotated'}
          </div>
        </div>

        {/* Annotated By Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151', marginBottom: '16px' }}>
          <span style={{ fontWeight: '500' }}>Annotated By:</span>
          {annotatorsColumn ? (
            <CellRenderer col={annotatorsColumn} data={data} cellViews={cellViews} decoration={decoration} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: '#e5e7eb', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6b7280'
              }}>
                DH
              </div>
              <span style={{ fontSize: '14px', color: '#374151' }}>DH Dhaneshwari</span>
            </div>
          )}
          <div style={{ marginLeft: 'auto', cursor: 'pointer' }}>
           {/* <span style={{ fontSize: '16px', color: '#9ca3af' }}>⋯</span> */}
          </div>
        </div>

      </div>
    </div>
  );
});
